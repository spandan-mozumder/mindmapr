'use client';

import { Button } from '@/components/ui/button';
import { GenerateInterviewQuestions } from '@/configs/AIModel';
import { set } from 'date-fns';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { saveInterviewToDB } from '@/actions/botprep';

export default function QuestionList({ formData, onCreateLink }) {
  const [loading, setLoading] = React.useState(true);
  const [questionList, setQuestionList] = React.useState([]);

  const onGenerateQuestions = async () => {
    try {
      setLoading(true);
      const questions = await GenerateInterviewQuestions(formData);
      setQuestionList(questions.interviewQuestions);
      console.log('Generated Questions:', questions.interviewQuestions);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to generate interview questions');
    }
  };

  useEffect(() => {
    if (formData) {
      onGenerateQuestions();
    }
  }, [formData]);

  const onFinish = async () => {
    const response = await saveInterviewToDB(formData, questionList);
    if (response.success) {
      toast.success('Interview saved successfully');
    } else {
      toast.error(`Failed to save interview: ${response.message}`);
    }

    onCreateLink(response.response.id);
  };

  return (
    <div>
      {loading && (
        <div className="p-5 bg-secondary rounded-md flex flex-col items-center gap-5 justify-center">
          <Loader2Icon className="animate-spin" />
          <div className="flex flex-col items-center gap-2 justify-center">
            <h2 className="font-semibold text-xl">Generating Interview Questions</h2>
            <p className="font-medium text-md text-gray-400">
              Our AI is crafting personalized questions
            </p>
          </div>
        </div>
      )}

      {!loading && questionList.length > 0 && (
        <div>
          <h2 className="font-bold text-lg mb-5">Generated Interview Questions</h2>
          <div>
            {questionList.map((question, index) => (
              <div
                key={index}
                className="p-3 bg-secondary flex flex-col gap-5 rounded-md mb-5 shadow-sm shadow-gray-500/80"
              >
                <h2 className="text-md">{question.question}</h2>
                <h2 className="text-gray-400 font-semibold">Type: {question?.type}</h2>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && (
        <div className="flex justify-end my-10">
          <Button onClick={() => onFinish()}>Create Interview Link and Finish</Button>
        </div>
      )}
    </div>
  );
}
