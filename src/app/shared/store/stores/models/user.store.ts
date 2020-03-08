import { Injectable } from '@angular/core';
import { AbstractStoreSingle } from '../../abstract-store/single.store.abstract';
import { User } from '../../dto/user.dto.user';
import { XhrService } from '../../services/xhr.service';

@Injectable()
export class UserStore extends AbstractStoreSingle<User>{

  constructor(private readonly xhrService: XhrService) {
    super("id");
  }

  getObservableFactory = this.xhrService.userGet;
  createObservableFactory = this.xhrService.userPost;
  updateObservableFactory = this.xhrService.userPut;
  deleteObservableFactory = this.xhrService.userDelete;
}
