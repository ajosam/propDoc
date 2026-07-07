"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, UploadCloud, FileText, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { WIZARD_TEMPLATES, type WizardTemplate } from "@/lib/wizard-templates";
import { buildPropertyFromWizard, type WizardPropertyInput } from "@/lib/build-property-from-wizard";
import { useLibraryStore } from "@/lib/store/library-store";

const EXTRACTION_STEPS = [
  "Uploading document",
  "Reading pages",
  "Identifying unit & pricing fields",
  "Cross-referencing payment plan",
  "Finalizing extraction",
];

type Step = "upload" | "extracting" | "review";

function confidenceColor(confidence: number) {
  if (confidence >= 0.85) return "emerald" as const;
  if (confidence >= 0.7) return "amber" as const;
  return "rose" as const;
}

export function ExtractionWizard() {
  const [step, setStep] = useState<Step>("upload");
  const [fileName, setFileName] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [template, setTemplate] = useState<WizardTemplate | null>(null);
  const [form, setForm] = useState<WizardPropertyInput | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const addProperty = useLibraryStore((s) => s.addProperty);

  function runExtraction(displayName: string, chosen: WizardTemplate) {
    setFileName(displayName);
    setTemplate(chosen);
    setStep("extracting");
    setCompletedSteps(0);

    EXTRACTION_STEPS.forEach((_, i) => {
      setTimeout(() => {
        setCompletedSteps(i + 1);
        if (i === EXTRACTION_STEPS.length - 1) {
          setTimeout(() => {
            setForm({ templateId: chosen.id, ...chosen.property });
            setStep("review");
          }, 400);
        }
      }, (i + 1) * 480);
    });
  }

  function beginExtraction(file: File) {
    const chosen = WIZARD_TEMPLATES[Math.abs(file.name.length + file.size) % WIZARD_TEMPLATES.length];
    runExtraction(file.name, chosen);
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) beginExtraction(file);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) beginExtraction(file);
  }

  function selectSampleTemplate(sample: WizardTemplate) {
    runExtraction(sample.documentName, sample);
  }

  function updateForm<K extends keyof WizardPropertyInput>(key: K, value: WizardPropertyInput[K]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  function handleSave() {
    if (!form) return;
    setIsSaving(true);
    const property = buildPropertyFromWizard(form);
    addProperty(property);
    router.push(`/property/${property.id}`);
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-8 py-10">
      <div className="flex items-center gap-2">
        {(["upload", "extracting", "review"] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={cn(
                "flex size-6 items-center justify-center rounded-full text-xs font-semibold",
                step === s
                  ? "bg-indigo-600 text-white"
                  : (["upload", "extracting", "review"].indexOf(step) > i
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-100 text-slate-400")
              )}
            >
              {["upload", "extracting", "review"].indexOf(step) > i ? <Check className="size-3.5" /> : i + 1}
            </div>
            {i < 2 && <div className="h-px w-10 bg-slate-200" />}
          </div>
        ))}
      </div>

      {step === "upload" && (
        <Card>
          <CardHeader>
            <CardTitle>Upload a document</CardTitle>
            <CardDescription>Brochure, SPA, or payment plan — PropertyDoc will extract the key fields automatically.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-10 text-center transition-colors hover:border-indigo-300 hover:bg-indigo-50/40"
            >
              <UploadCloud className="size-8 text-slate-400" />
              <p className="text-sm font-medium text-slate-600">Drag a PDF here, or click to browse</p>
              <p className="text-xs text-slate-400">PDF up to 25MB</p>
              <input ref={inputRef} type="file" accept="application/pdf" className="hidden" onChange={handleFileInput} />
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <div className="h-px flex-1 bg-slate-100" /> or try a sample <div className="h-px flex-1 bg-slate-100" />
            </div>

            <div className="flex flex-col gap-2">
              {WIZARD_TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => selectSampleTemplate(t)}
                  className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2.5 text-left text-sm hover:bg-slate-50"
                >
                  <FileText className="size-4 shrink-0 text-slate-400" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-slate-700">{t.documentName}</p>
                    <p className="text-xs text-slate-400">{t.property.name} · {t.property.area}</p>
                  </div>
                  <ArrowRight className="size-4 text-slate-300" />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {step === "extracting" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Loader2 className="size-4 animate-spin text-indigo-600" /> Extracting {fileName}
            </CardTitle>
            <CardDescription>This usually takes a few seconds.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {EXTRACTION_STEPS.map((label, i) => {
                const done = i < completedSteps;
                const active = i === completedSteps;
                return (
                  <div key={label} className="flex items-center gap-3 text-sm">
                    <div
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded-full border",
                        done ? "border-emerald-500 bg-emerald-500 text-white" : active ? "border-indigo-400 text-indigo-500" : "border-slate-200 text-slate-300"
                      )}
                    >
                      {done ? <Check className="size-3" /> : active ? <Loader2 className="size-3 animate-spin" /> : null}
                    </div>
                    <span className={cn(done ? "text-slate-700" : active ? "text-slate-700 font-medium" : "text-slate-400")}>{label}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {step === "review" && form && template && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="size-4 text-indigo-600" /> Review extracted details
              </CardTitle>
              <CardDescription>Edit anything that looks off before saving to your library.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Field label="Project name" value={form.name} onChange={(v) => updateForm("name", v)} span2 />
              <Field label="Developer" value={form.developer} onChange={(v) => updateForm("developer", v)} />
              <Field label="Area" value={form.area} onChange={(v) => updateForm("area", v)} />
              <Field label="Bedrooms" value={form.bedrooms} onChange={(v) => updateForm("bedrooms", v)} />
              <Field label="Size (sqft)" type="number" value={String(form.sizeSqft)} onChange={(v) => updateForm("sizeSqft", Number(v))} />
              <Field label="Handover" value={form.handoverQuarter} onChange={(v) => updateForm("handoverQuarter", v)} span2 />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financials</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Field label="List price (AED)" type="number" value={String(form.listPrice)} onChange={(v) => updateForm("listPrice", Number(v))} />
              <Field label="Price / sqft (AED)" type="number" value={String(form.pricePerSqft)} onChange={(v) => updateForm("pricePerSqft", Number(v))} />
              <Field label="Down payment (%)" type="number" value={String(form.downPaymentPct)} onChange={(v) => updateForm("downPaymentPct", Number(v))} />
              <Field label="DLD fee (%)" type="number" value={String(form.dldFeePct)} onChange={(v) => updateForm("dldFeePct", Number(v))} />
              <Field label="Service charge (AED/sqft/yr)" type="number" value={String(form.serviceChargePerSqft)} onChange={(v) => updateForm("serviceChargePerSqft", Number(v))} />
              <Field label="Expected rent (AED/yr)" type="number" value={String(form.expectedRentAnnual)} onChange={(v) => updateForm("expectedRentAnnual", Number(v))} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional fields detected</CardTitle>
              <CardDescription>Shown for reference — not saved as structured data in this demo.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {template.extraFields.map((f) => (
                <div key={f.label} className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2 text-sm">
                  <span className="text-slate-500">{f.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-800">{f.value}</span>
                    <Badge variant={confidenceColor(f.confidence)}>{Math.round(f.confidence * 100)}%</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => setStep("upload")} className="gap-1.5">
              <ArrowLeft className="size-4" /> Start over
            </Button>
            <Button variant="primary" onClick={handleSave} disabled={isSaving} className="gap-1.5">
              {isSaving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
              Confirm & save to library
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  span2 = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  span2?: boolean;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", span2 && "col-span-2")}>
      <Label>{label}</Label>
      <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
