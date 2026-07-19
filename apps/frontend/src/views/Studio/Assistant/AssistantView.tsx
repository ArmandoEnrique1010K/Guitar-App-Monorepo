import { useAssistant } from '@/hooks';
import { PaperPlaneIcon } from '@/icons';
import { Button } from '@/ui';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const AssistantView = () => {
    const {
        isGenerating,
        generateResponse,
        response,
        question,
        setQuestion,
        request,
    } = useAssistant();

    const handleSubmit = () => {
        if (!question.trim()) return;
        generateResponse(question);
        setQuestion('');
    };

    return (
        <aside
            className="2xl:w-180 xl:w-150  w-full shrink-0 h-full min-h-0
            xl:bg-linear-to-l xl:from-slate-700 xl:to-slate-800 
            bg-linear-to-r from-slate-700 to-slate-800 
            flex flex-col 
            px-2 pt-2 xl:pb-2 gap-2 
            text-xs tracking-wide "
        >
            <div
                className="
                    flex-1
min-h-0
                    bg-black
                h-full
text-sm

                    border-2
                    border-t-slate-900
                    border-l-slate-900
                    border-r-slate-500
                    border-b-slate-500

                    p-2

                    
                    overflow-y-auto

                    text-green-500
                    leading-relaxed
                    whitespace-pre-wrap

                            markdown-content

                                                    scrollbar
        scrollbar-track-black
        scrollbar-thumb-green-600


                "
            >
                {request && (
                    <>
                        <div className="text-orange-400">{request}</div>
                        <hr className="p-0 my-4" />
                    </>
                )}
                <Markdown remarkPlugins={[remarkGfm]}>{response}</Markdown>
            </div>
            <div className="flex items-stretch lg:gap-2 gap-4">
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Escribe una pregunta..."
                    disabled={isGenerating}
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
                         text-sm tracking-wide 
                    "
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSubmit();
                        }
                    }}
                />
                <Button
                    text=""
                    disabled={isGenerating}
                    onClick={handleSubmit}
                    icon={<PaperPlaneIcon className="size-6" />}
                    title="Responder con IA"
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
            font-size: 12px;
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
            margin-top: 12px;
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
