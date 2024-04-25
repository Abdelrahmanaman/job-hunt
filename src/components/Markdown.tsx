import ReactMarkdown from "react-markdown";
interface MarkdownProps {
  children: string;
}
export default function Markdown({ children }: MarkdownProps) {
  return <ReactMarkdown className={"prose prose-zinc"}>
    {children}
  </ReactMarkdown>;
}
