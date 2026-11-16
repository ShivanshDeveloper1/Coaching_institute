// components/admin/CreateQuiz/QuestionForm.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, CheckCircle2 } from "lucide-react";
import { RichTextEditor } from "./RichTextEditor";
import { QuestionData } from "./types";

interface QuestionFormProps {
  questionNumber: number;
  onAdd: (question: QuestionData) => void;
}

export function QuestionForm({ questionNumber, onAdd }: QuestionFormProps) {
  const [qSubject, setQSubject] = useState("");
  const [qText, setQText] = useState("");
  // Image states preserved in memory for backward compatibility, but UI is commented out
  const [qImage, setQImage] = useState<string | null>(null);
  const [qOptions, setQOptions] = useState(["", "", "", ""]);
  const [qOptionImages, setQOptionImages] = useState<(string | null)[]>([null, null, null, null]);
  const [qCorrect, setQCorrect] = useState(0);
  const [qExplanation, setQExplanation] = useState("");

  /* 
  // Image upload handler preserved for future re-activation if requested
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string | null) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  */

  const handleAddQuestion = () => {
    const newQuestion: QuestionData = {
      subject: qSubject.trim() || "General",
      question_text: qText.trim(),
      question_image: qImage,
      options: [...qOptions],
      option_images: [...qOptionImages],
      correct_answer: qCorrect,
      explanation: qExplanation.trim(),
    };

    onAdd(newQuestion);

    // Reset form for next question
    setQText("");
    setQImage(null);
    setQOptions(["", "", "", ""]);
    setQOptionImages([null, null, null, null]);
    setQCorrect(0);
    setQExplanation("");
  };

  const isFormValid = qText.trim().length > 0 && qSubject.trim().length > 0 && qOptions.every((o) => o.trim().length > 0);

  return (
    <Card className="border-[var(--line)] shadow-[var(--shadow)] bg-[var(--surface)] rounded-[var(--radius)] overflow-hidden">
      <CardHeader className="bg-[var(--surface-soft)] border-b border-[var(--line)] pb-5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center gap-2 text-[var(--ink)]">
            <div className="p-2 bg-[#0c3d3d] text-white rounded-lg">
              <PlusCircle className="w-5 h-5" />
            </div>
            Draft Question #{questionNumber}
          </CardTitle>
          <span className="text-xs font-bold text-[var(--green-900)] bg-[var(--green-300)] border border-[var(--line)] px-3 py-1 rounded-full">
            Science & Math Studio Enabled
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-8 pt-6 sm:p-8">
        
        {/* Subject & Question Prompt */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 space-y-2">
            <label className="text-sm font-bold text-[var(--ink)] block">
              Subject / Topic
            </label>
            <Input 
              className="bg-background rounded-xl border-border/80 focus:ring-2 focus:ring-[#0c3d3d]/20 focus:border-[#0c3d3d]" 
              value={qSubject} 
              onChange={(e) => setQSubject(e.target.value)} 
              placeholder="e.g. Chemistry, Physics" 
            />
            <p className="text-[11px] text-[var(--ink-soft)]">
              Specify the subject for this question.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2">
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-bold text-[var(--ink)] block">
                Question Statement
              </label>
              <span className="text-xs text-[var(--ink-soft)] font-medium">
                Supports Normal text & Formula mode
              </span>
            </div>
            
            {/*
              // Image upload UI commented out as per administrator instructions:
              <input type="file" id="qImageUpload" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, setQImage)} />
              <label htmlFor="qImageUpload"><ImageIcon className="w-4 h-4" /> Add Image</label>
              {qImage && <img src={qImage} alt="Preview" />}
            */}

            <RichTextEditor
              value={qText}
              onChange={setQText}
              placeholder="Type your question statement here... Switch to Formula Mode for chemical reactions, math fractions, roots, or vectors."
              rows={4}
              showPreview={true}
            />
          </div>
        </div>

        {/* Options Grouping: Each with dedicated compact formula toolbar */}
        <div className="p-6 rounded-2xl bg-[var(--surface-soft)] border border-[var(--line)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--line)] pb-4">
            <div>
              <label className="text-base font-bold text-[var(--ink)] block">
                Answer Options (A, B, C, D)
              </label>
              <p className="text-xs text-[var(--ink-soft)] mt-0.5">
                Each option has its own formula toolbar directly above it. Click the radio letter button to mark the correct answer.
              </p>
            </div>
            <span className="text-xs font-semibold text-[var(--green-900)] bg-[var(--green-300)] border border-[var(--line)] px-3 py-1.5 rounded-lg w-fit">
              Correct Answer: Option {String.fromCharCode(65 + qCorrect)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {qOptions.map((opt, i) => {
              const isCorrect = qCorrect === i;
              const optionLetter = String.fromCharCode(65 + i);

              return (
                <div 
                  key={i} 
                  className={`flex flex-col gap-3 p-4 rounded-xl border-2 transition-all bg-[var(--surface)] ${
                    isCorrect 
                      ? 'border-[var(--green-700)] shadow-sm' 
                      : 'border-[var(--line)] hover:border-gray-300'
                  }`}
                >
                  {/* Option Header: Selection Letter & Correct Indicator */}
                  <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
                    <button
                      type="button"
                      onClick={() => setQCorrect(i)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        isCorrect
                          ? "bg-[#0c3d3d] text-white shadow-xs"
                          : "bg-[var(--surface-soft)] text-[var(--ink-soft)] hover:bg-gray-200"
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center font-black">
                        {optionLetter}
                      </span>
                      <span>{isCorrect ? "Correct Answer" : "Mark as Correct"}</span>
                    </button>

                    {isCorrect && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-[var(--green-800)]">
                        <CheckCircle2 className="w-4 h-4 text-[var(--green-700)]" />
                        Selected Key
                      </span>
                    )}
                  </div>

                  {/* Dedicated Compact Science Editor for this Option */}
                  <RichTextEditor
                    value={opt}
                    onChange={(val) => {
                      const newOpts = [...qOptions];
                      newOpts[i] = val;
                      setQOptions(newOpts);
                    }}
                    placeholder={`Enter option ${optionLetter} text or formula...`}
                    rows={2}
                    compact={true}
                    showPreview={true}
                  />

                  {/*
                    // Option image upload UI commented out as per administrator instructions:
                    <input type="file" id={`optImageUpload-${i}`} className="hidden" accept="image/*" ... />
                    {qOptionImages[i] && <img src={qOptionImages[i]} ... />}
                  */}
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Explanation / Solution */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-[var(--ink)] block">
            Step-by-Step Solution & NCERT Explanation (Optional)
          </label>
          <p className="text-xs text-[var(--ink-soft)]">
            Displayed to students on the results scorecard after completing the exam.
          </p>
          <RichTextEditor
            value={qExplanation}
            onChange={setQExplanation}
            placeholder="Provide full scientific derivation, chemical equations, or step-by-step reasoning for the correct option..."
            rows={3}
            showPreview={true}
          />
        </div>

        {/* Submit Question to Test */}
        <Button
          type="button"
          onClick={handleAddQuestion}
          disabled={!isFormValid}
          className="w-full py-6 text-base font-bold bg-[#0c3d3d] hover:bg-[#0d4f4f] text-white rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50"
        >
          <PlusCircle className="w-5 h-5 mr-2" /> Save Question #{questionNumber} to Test Series
        </Button>
      </CardContent>
    </Card>
  );
}
