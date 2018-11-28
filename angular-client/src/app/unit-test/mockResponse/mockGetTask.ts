export const getTask: any = {
    "success": true,
    "data": [
        {
            "finished": true,
            "_id": "5bf249b81b9cdd1b04ab47b7",
            "task": "Task 1",
            "priorty": 11,
            "fromDate": "2018-10-31T18:30:00.000Z",
            "toDate": "2018-11-19T06:19:16.246Z",
            "__v": 0,
            "parent": null
        },
        {
            "finished": null,
            "_id": "5bf24bb11b9cdd1b04ab47b8",
            "task": "Task 2",
            "priorty": 13,
            "parent": "5bf2b0f41b9cdd1b04ab47c0",
            "fromDate": "2018-10-31T18:30:00.000Z",
            "toDate": "2018-11-29T18:30:00.000Z",
            "__v": 0
        },
        {
            "finished": false,
            "_id": "5bf2b0f41b9cdd1b04ab47c0",
            "task": "Task 3",
            "priorty": 8,
            "parent": "5bf24bb11b9cdd1b04ab47b8",
            "fromDate": "2018-10-31T18:30:00.000Z",
            "toDate": "2018-12-30T18:30:00.000Z",
            "__v": 0
        }
    ]
}