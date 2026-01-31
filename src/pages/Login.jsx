import { useState } from "react";
import { Mail, Lock, Activity } from "lucide-react";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../graphql/queries";
import { useAuth } from "../app/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginMutation, { loading }] = useMutation(LOGIN);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password harus diisi");
      return;
    }

    try {
      const { data } = await loginMutation({
        variables: { email, password },
      });

      login(data.login.accessToken);
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);

      if (err.graphQLErrors?.length) {
        setError(err.graphQLErrors[0].message);
      } else {
        setError("Terjadi kesalahan, coba lagi");
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-[#d5f7f0] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1D9D86] rounded-full">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-700 mb-2">
              Sistem Klinik
            </h1>
            <p className="text-gray-600">Masuk ke akun Anda</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Input
              label="Email"
              type="email"
              placeholder="Masukkan email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              prefix={<Mail className="h-5 w-5 text-gray-400" />}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Masukkan password Anda"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              prefix={<Lock className="h-5 w-5 text-gray-400" />}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Masuk..." : "Masuk"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
