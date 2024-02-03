import { Message, MessageTitle, MessageContent } from './message.class';

describe('Message', () => {
  it('Message', () => {
    expect(Message).toBeTruthy();
  });
});

describe('MessageTitle', () => {
  it('MessageTitle', () => {
    const msg = new MessageTitle({ type: 1 });
    expect(msg.type).toEqual(1);
  });
});

describe('MessageContent', () => {
  it('MessageContent', () => {
    const msg = new MessageContent({ content_type: 1 });
    expect(msg.content_type).toEqual(1);
  });
});
