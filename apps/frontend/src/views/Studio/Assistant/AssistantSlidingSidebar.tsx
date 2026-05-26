import { useAssistant } from '@/hooks/useAssistant';
import { SingleButton } from '@/ui/Studio/SingleButton';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const AssistantSlidingSidebar = () => {
    const { isGeneratingResultFromAI, generateResponse, resultFromAI } =
        useAssistant();

    const [question, setQuestion] = useState('');

    const handleSubmit = () => {
        if (!question.trim()) return;

        generateResponse(question);
        setQuestion('');
    };

    // TODO: CORREGIR EL ANCHO DE PANTALLA
    return (
        // TODO: SUGERENCIA, PASAR DE "to-slate-800" A "to-slate-900"
        <aside
            className="xl:w-100 w-80 shrink-0 h-full
            bg-linear-to-l from-slate-700 to-slate-800 
            border-l-2 border-slate-900
            flex flex-col 
            p-3 gap-3
            text-xs uppercase tracking-wide font-bold"
        >
            <div
                className="
                    flex-1

                    bg-black

                    border-2
                    border-t-slate-900
                    border-l-slate-900
                    border-r-slate-500
                    border-b-slate-500

                    p-2

                    overflow-y-auto

                    text-green-500
                    text-[10px]
                    leading-relaxed
                    whitespace-pre-wrap

                            markdown-content

                "
            >
                <Markdown remarkPlugins={[remarkGfm]}>{resultFromAI}</Markdown>
            </div>
            <div className="flex items-stretch gap-2">
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Escribe una pregunta..."
                    disabled={isGeneratingResultFromAI}
                    className="
                        flex-1

                        bg-black
                        text-green-400
                        placeholder-green-500/40

                        px-3
                        py-2

                        outline-none

                        border-2
                        border-t-slate-900
                        border-l-slate-900
                        border-r-slate-500
                        border-b-slate-500
                        text-xs
                    "
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSubmit();
                        }
                    }}
                />
                <SingleButton
                    text=""
                    disabled={isGeneratingResultFromAI}
                    onClick={handleSubmit}
                    icon={<PaperPlaneIcon className="size-5" />}
                    title="Enviar pregunta"
                />
            </div>

            <style>
                {`
.markdown-content table {
    display: block;
    width: max-content;
    max-width: 100%;

    overflow-x: auto;
    overflow-y: hidden;

    border-collapse: collapse;
}

        .markdown-content th,
        .markdown-content td {
            border: 1px solid #22c55e;
            padding: 4px;
            text-align: left;
        }

        .markdown-content th {
            background: #052e16;
            color: #4ade80;
        }

        .markdown-content tr:nth-child(even) {
            background: rgba(34,197,94,0.05);
        }

        .markdown-content code {
            background: #111;
            color: #facc15;
            padding: 1px 3px;
            border-radius: 2px;
            font-size: 10px;
        }

        .markdown-content pre {
            background: #050505;
            border: 1px solid #14532d;
            padding: 8px;
            overflow-x: auto;
            margin-top: 8px;
            margin-bottom: 8px;
        }

        .markdown-content pre code {
            background: transparent;
            padding: 0;
            color: #4ade80;
        }

        .markdown-content h1,
        .markdown-content h2,
        .markdown-content h3 {
            color: #86efac;
            margin-top: 10px;
            margin-bottom: 6px;
        }

        .markdown-content ul {
            padding-left: 16px;
            list-style-type: square;
        }

        .markdown-content blockquote {
            border-left: 3px solid #22c55e;
            padding-left: 8px;
            color: #86efac;
            opacity: 0.9;
        }

        .markdown-content a {
            color: #facc15;
            text-decoration: underline;
        }
    `}
            </style>
        </aside>
    );
};
