import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';

if (Meteor.isServer) {
    describe('notes', function() {
        const noteOne = {
            _id: 'testNoteId1',
            title: 'My Title',
            body: 'My Body for note',
            updatedAt: 0,
            userId: 'testUserId1'
        };

        const noteTwo = {
            _id: 'testNoteId2',
            title: 'Another Title',
            body: 'Another Body Test',
            updatedAt: 0,
            userId: 'testUserId2'
        };

        beforeEach(function() {
            Notes.remove({});
            Notes.insert(noteOne);
            Notes.insert(noteTwo);
        });

        it('should insert new note', function() {
            const userId = 'testid';
            const _id = Meteor.server.method_handlers['notes.insert'].apply({userId});

            expect(Notes.findOne({ _id, userId })).toBeTruthy();
        });

        it('should not insert note if not authenticated', function() {
            expect(() => {
                Meteor.server.method_handlers['notes.insert']();
            }).toThrow();
        });

        it('should remove note', function() {
            Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId}, [noteOne._id]);
            expect(Notes.findOne({_id: noteOne._id})).toBeFalsy();
        });

        it('should not remove note if unauthenticated', function() {
            expect(() => {
                Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
            }).toThrow();
        });

        it('should not remove note if invalid _id', function() {
            expect(() => {
                Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId}, ['']);
            }).toThrow();
        });

        it('should update note', function() {
            const title = 'this is an updated title';
            const _id = noteOne._id;
            Meteor.server.method_handlers['notes.update'].apply({
                userId: noteOne.userId
            }, [_id, 
                { title }
            ]);

            const note = Notes.findOne({_id});

            expect(note.updatedAt).toBeGreaterThan(0);
            expect(note).toInclude({
                title,
                body: noteOne.body
            });
        });

        it('should throw error if extra updates provided', function() {
            expect(() => {
                const _id = noteOne._id;
                Meteor.server.method_handlers['notes.update'].apply({
                    userId: noteOne.userId
                }, [_id, 
                    { title: 'new title', invalidParameter: 'Any invalid parameter' }
                ]);
            }).toThrow();
        });

        it('should not update if user was not creator', function() {
            const title = 'this is an updated title';
            const _id = noteOne._id;
            Meteor.server.method_handlers['notes.update'].apply({
                userId: 'testid'
            }, [_id, 
                { title }
            ]);

            const note = Notes.findOne({_id});

            expect(note).toInclude(noteOne);
        });

        it('should not update note if unauthenticated', function() {
            expect(() => {
                Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);
            }).toThrow();
        });

        it('should not update note if invalid _id', function() {
            expect(() => {
                Meteor.server.method_handlers['notes.update'].apply({userId: noteOne.userId}, ['']);
            }).toThrow();
        });

        it('should return a users notes', function() {
            const res = Meteor.server.publish_handlers.notesPub.apply({ userId: noteOne.userId });
            const notes = res.fetch();

            expect(notes.length).toBe(1);
            expect(notes[0]).toEqual(noteOne);
        });

        it('should return no notes for user that has none', function() {
            const res = Meteor.server.publish_handlers.notesPub.apply({ userId: 'anyInvalidId' });
            const notes = res.fetch();

            expect(notes.length).toBe(0);
        });

    });
}