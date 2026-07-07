import Scrapbook, { type BookPage } from "@/components/book/Scrapbook";
import CoverPage from "@/components/pages/CoverPage";
import WorkPage from "@/components/pages/WorkPage";
import RecordingsPage from "@/components/pages/RecordingsPage";
import AboutPage from "@/components/pages/AboutPage";
import SayHiPage from "@/components/pages/SayHiPage";

const pages: BookPage[] = [
  { id: "cover", tab: "cover", render: <CoverPage /> },
  { id: "work", tab: "things I made", render: <WorkPage /> },
  { id: "music", tab: "the recordings", render: <RecordingsPage /> },
  { id: "about", tab: "who I am", render: <AboutPage /> },
  { id: "hi", tab: "say hi", render: <SayHiPage /> },
];

export default function HomePage() {
  return <Scrapbook title="Arya's field book" subtitle="code + strings, taped together" pages={pages} />;
}
