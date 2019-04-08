export class Fish {

  public id: number = 0;
  public sound: string;
  public likes: number;
  public ideaLink: string;
  public age: number;
  public birthday: Date;
  public summary: string;

  constructor(sound: string, linkToIdea: string, summary: string) {
    this.sound = sound;

    this.likes = 0;
    this.ideaLink = linkToIdea;
    this.age = 0;
    this.birthday = new Date();
    this.summary = summary;
  }
}
