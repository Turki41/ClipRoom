interface HeaderProps {
    title: string,
    subtitle: string,
    userImg?: string,
}

interface ParamsWithSearch {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string | undefined>>;
}

type Visibility = "public" | "private";

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  userImg: string;
  username: string;
  createdAt: Date;
  views: number;
  visibility: Visibility;
  duration: number | null;
}
