import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_WORKFLOW, SAVE_WORKFLOW } from "../../graphql/queries";
import { ArrowDown, ArrowRight, ArrowUp, Trash } from "lucide-react";
import Button from "../../components/Button";
import Input from "../../components/Input";

export default function WorkflowBuilder() {
  const { data } = useQuery(GET_WORKFLOW);
  const [saveWorkflow] = useMutation(SAVE_WORKFLOW);

  const [steps, setSteps] = useState([]);
  const [form, setForm] = useState({});
  const [showAddStep, setShowAddStep] = useState(false);
  const stepsFromData = data?.workflow?.steps || [];

  useEffect(() => {
    if (data?.workflow) {
      setSteps(stepsFromData);
    }
  }, [data]);

  const addStep = () => {
    if (!form.title.trim()) return;

    setSteps([
      ...steps,
      {
        id: crypto.randomUUID(),
        title: form.title,
        desc: form.desc?.trim() || "-",
        order: steps.length + 1,
      },
    ]);

    setForm({ title: "", desc: "" });
    setShowAddStep(false);
  };

  const removeStep = (id) => {
    setSteps(
      steps.filter((s) => s.id !== id).map((s, i) => ({ ...s, order: i + 1 })),
    );
  };

  const move = (index, direction) => {
    const newSteps = [...steps];
    const target = index + direction;
    if (target < 0 || target >= steps.length) return;

    [newSteps[index], newSteps[target]] = [newSteps[target], newSteps[index]];

    setSteps(newSteps.map((s, i) => ({ ...s, order: i + 1 })));
  };

  const save = async () => {
    try {
      await saveWorkflow({
        variables: {
          name: "Workflow Klinik",
          steps: steps.map(({ __typename, ...s }) => s),
        },
      });
      alert("Workflow berhasil disimpan");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full lg;max-w-xl">
      <h2 className="text-xl font-semibold">Workflow Builder</h2>
      <p>Kelola alur kerja proses klinik</p>
      <div className="bg-white rounded-xl p-5 mt-4">
        <h3 className="text-md font-semibold mb-2">Alur Workflow</h3>
        <div className="flex flex-wrap gap-2">
          {stepsFromData.map((step, i) => (
            <div key={step.id} className="flex items-center gap-1">
              <div className="flex items-center justify-center bg-[#1D9D86] text-white text-sm p-2 px-3 rounded-xl">
                {step.title}
              </div>
              {i < stepsFromData.length - 1 && <ArrowRight size={10} />}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl p-5 mt-4">
        <div className="flex justify-between mb-3">
          <h3 className="text-md font-semibold mb-2">Kelola Langkah</h3>
          <Button onClick={() => setShowAddStep(true)}>Tambah Langkah</Button>
        </div>
        {showAddStep && (
          <div className="p-4 mb-4 space-y-3 border border-[#1D9D86] rounded-md bg-[#EEFBF8]">
            <h3 className="font-semibold">Tambah Langkah Baru</h3>
            <Input
              label="Nama Langkah"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Judul..."
              className="border border-[#1D9D86]"
            />
            <Input
              label="Deskripsi"
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              placeholder="Deskripsi..."
            />
            <div className="flex justify-end gap-2 mt-7">
              <Button
                className="w-full"
                disabled={!form.title}
                onClick={addStep}
              >
                Simpan
              </Button>
              <Button
                className="w-full"
                secondary
                onClick={() => {
                  setForm({ title: "", desc: "" });
                  setShowAddStep(false);
                }}
              >
                Batal
              </Button>
            </div>
          </div>
        )}
        <div className="bg-white rounded-xl my-4 space-y-2">
          {steps.map((step, i) => (
            <div
              key={step.id}
              className="flex items-center gap-2 border border-gray-200 p-3 rounded-xl"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 text-sm font-semibold text-[#1D9D86] bg-[#EEFBF8] rounded-full flex items-center justify-center">
                    {i + 1}
                  </div>
                  <span>{step.title}</span>
                </div>
                <span className="text-xs text-gray-500">{step.desc}</span>
              </div>
              <button
                disabled={i === 0}
                className="flex items-center justify-center w-6 h-6 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                onClick={() => move(i, -1)}
              >
                <ArrowUp size={12} />
              </button>
              <button
                className="flex items-center justify-center w-6 h-6 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                onClick={() => move(i, 1)}
                disabled={i === steps.length - 1}
              >
                <ArrowDown size={12} />
              </button>
              <button
                className="flex items-center justify-center w-6 h-6 rounded-md border border-red-300 hover:bg-gray-100"
                onClick={() => removeStep(step.id)}
              >
                <Trash size={12} className="text-red-500" />
              </button>
            </div>
          ))}
          <Button className="mt-4 w-full" onClick={save}>
            Simpan Workflow
          </Button>
        </div>
      </div>
    </div>
  );
}
