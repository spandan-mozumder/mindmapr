'use client';

import QuestionList from './_components/question-list';
import FormContainer from './_components/form-container';
import InterviewLink from './_components/interview-link';
import React from 'react';
import { toast } from 'sonner';

export default function CreateInterview() {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState();
  const [interviewId, setInterviewId] = React.useState('');

  const onHandleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const onGoToNext = () => {
    if (
      !formData?.jobPosition ||
      !formData?.jobDescription ||
      !formData?.type ||
      !formData?.duration
    ) {
      toast.warning('Please fill all the fields');
      return;
    }
    setStep(step + 1);
  };

  const onCreateLink = (interviewId) => {
    console.log('Interview ID:', interviewId);
    setInterviewId(interviewId);
    setStep(step + 1);
  };

  return (
    <div className="mt-10 px-10 md:px-24 lg:px-44">
      <h2 className="font-bold text-2xl m-5 mb-10 ">Create New Interview</h2>
      {step == 1 ? (
        <FormContainer onHandleInputChange={onHandleInputChange} goToNext={() => onGoToNext()} />
      ) : step == 2 ? (
        <QuestionList
          formData={formData}
          onCreateLink={(interviewId) => onCreateLink(interviewId)}
        />
      ) : step == 3 ? (
        <InterviewLink interviewId={interviewId} formData={formData} />
      ) : null}
    </div>
  );
}
