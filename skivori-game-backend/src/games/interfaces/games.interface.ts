export interface Game {
  id: string;  // O id é do tipo string
  slug: string;
  title: string;
  providerName: string;
  thumb: {
    url: string;
  };
}
