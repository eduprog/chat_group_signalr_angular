import { TestBed } from '@angular/core/testing';

import { HasConversationGuard } from './has-conversation.guard';

describe('HasConversationGuard', () => {
  let guard: HasConversationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasConversationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
