export interface Performance {
  title: string;
  artist: string;
  youtubeId: string;
  // handwritten note under the record
  note?: string;
}

export const performances: Performance[] = [
  {
    title: "At Last",
    artist: "Etta James",
    youtubeId: "T1Q9R1zc20I",
    note: "slow enough that every wrong note shows",
  },
  {
    title: "House of the Rising Sun",
    artist: "The Animals",
    youtubeId: "1WjGAjKmmHc",
    note: "somehow sounds bigger than four people",
  },
  {
    title: "September",
    artist: "Earth, Wind & Fire",
    youtubeId: "MzlFf6N3HI8",
    note: "impossible to play this one and not smile",
  },
];
