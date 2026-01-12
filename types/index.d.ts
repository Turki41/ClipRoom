interface HeaderProps {
    title: string,
    subtitle: string,
    userImg?: string,
}

interface ParamsWithSearch {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string | undefined>>;
}