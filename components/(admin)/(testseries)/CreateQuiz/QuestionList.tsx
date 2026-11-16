// components/admin/CreateQuiz/QuestionList.tsx
"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Trash2, Save, Upload } from "lucide-react";
import { LatexText } from "./LatexText";
import { QuestionData } from "./types";

interface QuestionListProps {
  questions: QuestionData[];
  onRemove: (index: number) => void;
  onSubmit: () => void;
  submitting: boolean;
}

export function QuestionList({ questions, onRemove, onSubmit, submitting }: QuestionListProps) {
  if (questions.length === 0) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border-[var(--line)] shadow-[var(--shadow)] overflow-hidden rounded-[var(--radius)] bg-[var(--surface)]">
        <CardHeader className="bg-[var(--surface-soft)] border-b border-[var(--line)] py-5 flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-3 text-[var(--ink)]">
            <div className="p-1.5 bg-[#0c3d3d] text-white rounded-md">
              <Check className="w-5 h-5" />
            </div>
            Ready for Publishing ({questions.length} Question{questions.length !== 1 ? 's' : ''})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-[500px] overflow-y-auto p-5 space-y-4 bg-muted/10">
            {questions.map((q, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: i * 0.05 }} 
                key={i} 
                className="p-5 rounded-2xl bg-background border border-border/60 shadow-sm flex items-start gap-4 relative group hover:border-[#0c3d3d]/40 transition-colors"
              >
                <div className="shrink-0">
                  <Badge variant="secondary" className="bg-[#0c3d3d] text-white font-bold px-3 py-1 text-sm rounded-lg">
                    Q{i + 1}
                  </Badge>
                </div>
                <div className="min-w-0 pr-12 flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[var(--ink-soft)] bg-[var(--surface-soft)] border border-[var(--line)] px-2.5 py-0.5 rounded-md">
                      {q.subject}
                    </span>
                    <span className="text-[11px] font-bold text-[var(--green-900)] bg-[var(--green-300)] border border-[var(--line)] px-2.5 py-0.5 rounded-md">
                      Key: Option {String.fromCharCode(65 + q.correct_answer)}
                    </span>
                  </div>

                  {q.question_text ? (
                    <LatexText
                      text={q.question_text}
                      className="block font-semibold text-[var(--ink)] text-base leading-snug"
                    />
                  ) : (
                    <span className="block font-semibold text-[var(--ink)] text-base leading-snug">[Formula/Question Statement]</span>
                  )}

                  {/* Options Preview */}
                  {q.options && q.options.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-border/40 mt-2">
                      {q.options.map((opt, optIdx) => {
                        const isCorrectOpt = optIdx === q.correct_answer;
                        return (
                          <div 
                            key={optIdx} 
                            className={`text-xs flex items-center gap-2 p-2 rounded-lg border transition-all ${
                              isCorrectOpt 
                                ? 'bg-[var(--green-300)]/40 border-[var(--green-600)] font-semibold text-[var(--green-900)]' 
                                : 'bg-[var(--surface-soft)] border-[var(--line)] text-[var(--ink)]'
                            }`}
                          >
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 font-bold ${
                              isCorrectOpt ? 'bg-[#0c3d3d] text-white' : 'bg-background border border-[var(--line)] text-[var(--ink-soft)]'
                            }`}>
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="truncate flex-1">
                              <LatexText text={opt} />
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Explanation Preview */}
                  {q.explanation && (
                    <div className="text-xs text-[var(--ink-soft)] bg-[var(--surface-soft)] p-2.5 rounded-lg border border-[var(--line)] mt-2">
                      <span className="font-bold text-[var(--green-800)] mr-1">Explanation:</span>
                      <LatexText text={q.explanation} />
                    </div>
                  )}
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemove(i)}
                  className="absolute right-4 top-4 text-muted-foreground hover:text-red-600 hover:bg-red-500/10 opacity-70 group-hover:opacity-100 transition-all rounded-full"
                  title="Remove question"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="p-6 bg-background border-t border-border/50">
            <Button
              type="button"
              onClick={onSubmit}
              disabled={submitting}
              className="w-full py-7 text-xl font-extrabold shadow-xl rounded-xl transition-all bg-[#0c3d3d] hover:bg-[#0d4f4f] text-white hover:scale-[1.005]"
            >
              {submitting ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                  <Upload className="w-6 h-6 mr-3" />
                </motion.div>
              ) : (
                <Save className="w-6 h-6 mr-3" />
              )}
              {submitting ? "Uploading Test Series to Firestore..." : "Publish Test Series to Database"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
