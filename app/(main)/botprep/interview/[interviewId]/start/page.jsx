'use client';

import { InterviewDataContext } from '@/app/(main)/_context/interviewdatacontext';
import { Bot, Mic, Phone, Timer, User } from 'lucide-react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Vapi from '@vapi-ai/web';
import AlertConfirmation from './_components/alert-confirmation';
import { toast } from 'sonner';
import { GenerateInterviewFeedback } from '@/configs/AIModel';
import { storeInterviewFeedback } from '@/actions/botprep';
import { useRouter } from 'next/navigation';

export default function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);
  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState();
  const router = useRouter();
  const vapiRef = useRef(null);
  const conversationRef = useRef();

  useEffect(() => {
    if (!vapiRef.current) {
      vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
    }

    const vapi = vapiRef.current;

    const handleMessage = (message) => {
      if (message.conversation) {
        const convoString = JSON.stringify(message.conversation);
        setConversation(convoString);
        conversationRef.current = convoString;
      }
    };

    const handleSpeechStart = () => {
      setActiveUser(false);
    };

    const handleSpeechEnd = () => {
      setActiveUser(true);
    };

    const handleCallStart = () => {
      toast('Call Connected...');
    };

    const handleCallEnd = () => {
      toast('Call Ended...');
      generateFeedback(conversationRef.current);
    };

    vapi.on('message', handleMessage);
    vapi.on('speech-start', handleSpeechStart);
    vapi.on('speech-end', handleSpeechEnd);
    vapi.on('call-start', handleCallStart);
    vapi.on('call-end', handleCallEnd);

    return () => {
      vapi.off('message', handleMessage);
      vapi.off('speech-start', handleSpeechStart);
      vapi.off('speech-end', handleSpeechEnd);
      vapi.off('call-start', handleCallStart);
      vapi.off('call-end', handleCallEnd);
    };
  }, []);

  useEffect(() => {
    if (interviewInfo) {
      startCall();
    }
  }, [interviewInfo]);

  const startCall = () => {
    const vapi = vapiRef.current;
    if (!vapi || !interviewInfo) return;

    const questionList = interviewInfo?.interviewData?.questionList
      .map((q, i) => `${i + 1}. ${q.question}`)
      .join(', ');

    const assistantOptions = {
      name: 'AI Recruiter',
      firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition}?`,
      transcriber: {
        provider: 'deepgram',
        model: 'nova-2',
        language: 'en-US',
      },
      voice: {
        provider: 'playht',
        voiceId: 'jennifer',
      },
      model: {
        provider: 'openai',
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `
You are an AI voice assistant conducting interviews. Your job is to ask candidates provided interview questions and assess their responses.

Begin with a friendly intro, setting a relaxed yet professional tone. Example: 
"Hey there! Welcome to your ${interviewInfo?.interviewData?.jobPosition} interview. Let's get started with a few questions!"

Ask one question at a time and wait for the candidate's response. Keep questions clear and concise.

Questions: ${questionList}

If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"

Provide brief, encouraging feedback after each answer. Example:
"Nice! That’s a solid answer." or "Hmm, not quite! Want to try again?"

Keep the conversation natural and engaging. Use casual phrases like "Alright, next up..." or "Let’s tackle a tricky one!"

After 5–7 questions, wrap up by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"

End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"

Guidelines:
1. Be friendly, engaging, and witty
2. Keep responses short and natural
3. Adapt based on the candidate's confidence
4. Ensure the interview remains focused on React
`.trim(),
          },
        ],
      },
    };

    vapi.start(assistantOptions);
  };

  const stopInterview = () => {
    toast('Ending interview...');
    vapiRef.current?.stop();
  };

  const generateFeedback = async (finalConversation) => {
    const interviewId = interviewInfo?.interviewData?.id;

    if (!interviewId) {
      toast.error('Missing interview ID. Cannot save feedback.');
      return;
    }

    try {
      const feedback = await GenerateInterviewFeedback(finalConversation);

      if (!feedback?.feedback) {
        throw new Error('No feedback returned from AI');
      }

      const feedbackData = {
        interviewId,
        rating: feedback.feedback.rating,
        summary: feedback.feedback.summary,
        recommendation: feedback.feedback.recommendation,
        reason: feedback.feedback.reason,
        userName: interviewInfo?.userName,
        userEmail: interviewInfo?.userEmail,
      };

      await storeInterviewFeedback(feedbackData);
      toast.success('Interview feedback saved successfully!');
      router.replace('/botprep/interview/' + interviewId + '/complete');
    } catch (error) {
      console.error('generateFeedback Error:', error);
      toast.error('Error in generateFeedback. Please start again.');
    }
  };

  return (
    <div className="mt-5">
      <h2 className="font-bold text-xl flex justify-between m-5">
        AI Interview Session
        <span className="flex gap-2 items-center">
          <Timer />
          00:00:00
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <div
          className={`bg-secondary h-[400px] rounded-md flex items-center justify-center border ${!activeUser && 'border-primary'}`}
        >
          <Bot />
        </div>

        <div
          className={`bg-secondary h-[400px] rounded-md flex flex-col items-center justify-center gap-2 ${activeUser && 'border-primary'}`}
        >
          <User />
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>

      <div className="flex items-center gap-5 justify-center my-5">
        <Mic
          className="w-12 h-12 p-3 bg-gray-300 rounded-full text-black cursor-pointer"
          onClick={() => generateFeedback(conversationRef.current)}
        />
        <AlertConfirmation stopInterview={stopInterview}>
          <Phone className="w-12 h-12 p-3 bg-red-500 text-white rounded-full cursor-pointer" />
        </AlertConfirmation>
      </div>

      <h2 className="text-sm text-gray-400 text-center my-5">Interview in Progress...</h2>
    </div>
  );
}
