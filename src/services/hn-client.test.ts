import HNClient from "./hn-client";

describe('hn api client', () => {
  let client = new HNClient();

  it('gets top stories', async () => {
    let r = await client.topStories();
    expect(r.status).toEqual(200);
    expect(r.data).toBeTruthy();
  });

  it('gets a story by id', async () => {
    let r = await client.storyByID('24201306');
    expect(r.status).toEqual(200);
    expect(r.data).toBeTruthy();
    console.log(r.data)
  });

});