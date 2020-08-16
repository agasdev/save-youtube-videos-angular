export class Video {
  constructor(
    public id: number,
    public userId: number,
    public title: string,
    public description: string,
    public url: string,
    public createdAt: any,
    public updatedAt: any
  ) {}
}
