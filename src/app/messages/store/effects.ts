import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { MessagesService } from "../services/messages.service";
import * as MessageActions from "./actions";
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { MessageInterface } from "../types/message.interface";


@Injectable()
export class MessagesEffects {

    constructor(private actions$: Actions, private messagesService: MessagesService) {

    }

    getMessages$ = createEffect(() => 
        this.actions$.pipe(
            ofType(MessageActions.getMessages),
            mergeMap(() => {
                return this.messagesService.getMessages().pipe(
                    map((messages) => MessageActions.getMessagesSuccess({ messages })),
                    catchError((error) =>
                      of(MessageActions.getMessagesFailure({ error: error.message }))
                    )
                  );
            })
        )
    ); 
}