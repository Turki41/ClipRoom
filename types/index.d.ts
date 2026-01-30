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

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  as?: "input" | "textarea" | "select";
  options?: { value: string; label: string }[];
}

interface FileInputProps {
  id: string;
  label: string;
  accept: string;
  file: File | null;
  previewUrl: string | null;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  type: "video" | "image";
}

interface Video {
  id: string,
  user_id: string,
  title: string,
  description: string,
  visibility: Visibility,
  video_url: string,
  thumbnail_url: string,
  duration: string,
  views: number,
  created_at: Date,
  Users: {
    userName: string,
    profilePicture: string,
  }
}

interface EmptyStateProps {
  icon: string;
  title: string;
  description?: string;
}
