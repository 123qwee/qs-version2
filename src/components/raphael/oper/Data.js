const data = {
  "processDefinition": {
    "id": "qhgridprocess:8:227504",
    "name": "秦汉流程",
    "key": "qhgridprocess",
    "version": 8,
    "deploymentId": "227501",
    "isGraphicNotationDefined": true
  },
  "activities": [{
    "activityId": "task1",
    "properties": {
      "name": "登记",
      "type": "userTask"
    },
    "x": 188,
    "y": 42,
    "width": 100,
    "height": 80
  }, {
    "activityId": "task2",
    "properties": {
      "name": "办公室受理",
      "type": "userTask"
    },
    "x": 447,
    "y": 44,
    "width": 100,
    "height": 80
  }, {
    "activityId": "task3",
    "properties": {
      "name": "联络员协办",
      "type": "userTask"
    },
    "x": 715,
    "y": 44,
    "width": 100,
    "height": 80
  }, {
    "activityId": "task4",
    "properties": {
      "name": "三级网格长分派",
      "type": "userTask"
    },
    "x": 447,
    "y": 223,
    "width": 100,
    "height": 80
  }, {
    "activityId": "task5",
    "properties": {
      "name": "办公室核查",
      "type": "userTask"
    },
    "x": 447,
    "y": 424,
    "width": 100,
    "height": 80
  }, {
    "activityId": "task6",
    "properties": {
      "name": "结案",
      "type": "userTask"
    },
    "x": 447,
    "y": 603,
    "width": 100,
    "height": 79
  }, {
    "activityId": "task7",
    "properties": {
      "name": "二级网格长协办",
      "type": "userTask"
    },
    "x": 715,
    "y": 223,
    "width": 100,
    "height": 80
  }, {
    "activityId": "task8",
    "properties": {
      "name": "一级网格长协办",
      "type": "userTask"
    },
    "x": 715,
    "y": 424,
    "width": 100,
    "height": 80
  }, {
    "activityId": "task9",
    "properties": {
      "name": "网格员办理",
      "type": "userTask"
    },
    "x": 188,
    "y": 223,
    "width": 100,
    "height": 80
  }, {
    "activityId": "start",
    "properties": {
      "type": "startEvent"
    },
    "x": 67,
    "y": 67,
    "width": 30,
    "height": 30
  }, {
    "activityId": "end",
    "properties": {
      "type": "endEvent"
    },
    "x": 760,
    "y": 629,
    "width": 28,
    "height": 28
  }],
  "sequenceFlows": [{
    "id": "sid-D5BFC89A-8111-4A9A-8DA6-981AE7D8AC22",
    "name": null,
    "flow": "(task1)--sid-D5BFC89A-8111-4A9A-8DA6-981AE7D8AC22-->(task2)",
    "xPointArray": [288, 447],
    "yPointArray": [82, 84]
  }, {
    "id": "sid-DD42A083-CC99-44C4-A6F4-0DEAF4609507",
    "name": null,
    "flow": "(task2)--sid-DD42A083-CC99-44C4-A6F4-0DEAF4609507-->(task3)",
    "xPointArray": [547, 715],
    "yPointArray": [84, 84]
  }, {
    "id": "sid-D3CCBC85-1AE6-4E55-A5B7-F5AE20126F2F",
    "name": null,
    "flow": "(task2)--sid-D3CCBC85-1AE6-4E55-A5B7-F5AE20126F2F-->(task4)",
    "xPointArray": [497, 497],
    "yPointArray": [124, 223]
  }, {
    "id": "sid-FBB75D6D-BB20-4380-89A6-FD5FC6B0A134",
    "name": null,
    "flow": "(task2)--sid-FBB75D6D-BB20-4380-89A6-FD5FC6B0A134-->(task6)",
    "xPointArray": [497, 497],
    "yPointArray": [124, 603]
  }, {
    "id": "sid-F351F067-B905-4346-9114-4B8F4D279F90",
    "name": null,
    "flow": "(task3)--sid-F351F067-B905-4346-9114-4B8F4D279F90-->(task2)",
    "xPointArray": [715, 547],
    "yPointArray": [84, 84]
  }, {
    "id": "sid-DAED34A1-2B7B-4186-A808-2EA7DE20F1D2",
    "name": null,
    "flow": "(task4)--sid-DAED34A1-2B7B-4186-A808-2EA7DE20F1D2-->(task5)",
    "xPointArray": [497, 497],
    "yPointArray": [303, 424]
  }, {
    "id": "sid-85BFCCBD-4AD4-4307-8F6F-7A6829C4DAAC",
    "name": null,
    "flow": "(task4)--sid-85BFCCBD-4AD4-4307-8F6F-7A6829C4DAAC-->(task7)",
    "xPointArray": [547, 715],
    "yPointArray": [263, 263]
  }, {
    "id": "sid-987F09C1-12DF-4019-A462-F4A50EE19107",
    "name": null,
    "flow": "(task4)--sid-987F09C1-12DF-4019-A462-F4A50EE19107-->(task9)",
    "xPointArray": [447, 288],
    "yPointArray": [263, 263]
  }, {
    "id": "sid-0FBA90FB-F47A-4F03-8AEA-C27FE330FD79",
    "name": null,
    "flow": "(task5)--sid-0FBA90FB-F47A-4F03-8AEA-C27FE330FD79-->(task6)",
    "xPointArray": [497, 497],
    "yPointArray": [504, 603]
  }, {
    "id": "sid-EAA20AA2-A11A-4BAF-A126-1C20332812A5",
    "name": null,
    "flow": "(task6)--sid-EAA20AA2-A11A-4BAF-A126-1C20332812A5-->(end)",
    "xPointArray": [547, 760],
    "yPointArray": [643, 643]
  }, {
    "id": "sid-C2CA4176-C79D-4D93-B27D-18009B8326AE",
    "name": null,
    "flow": "(task7)--sid-C2CA4176-C79D-4D93-B27D-18009B8326AE-->(task8)",
    "xPointArray": [765, 765],
    "yPointArray": [303, 424]
  }, {
    "id": "sid-E00595C7-91E1-4129-A000-51FCA8E6BF9D",
    "name": null,
    "flow": "(task7)--sid-E00595C7-91E1-4129-A000-51FCA8E6BF9D-->(task4)",
    "xPointArray": [715, 547],
    "yPointArray": [263, 263]
  }, {
    "id": "sid-86B29213-B31D-4567-AF52-9497D5C3EE69",
    "name": null,
    "flow": "(task8)--sid-86B29213-B31D-4567-AF52-9497D5C3EE69-->(task7)",
    "xPointArray": [765, 765],
    "yPointArray": [424, 303]
  }, {
    "id": "sid-E5D2AED3-BE97-4245-A322-58B7A2E9C69D",
    "name": null,
    "flow": "(task9)--sid-E5D2AED3-BE97-4245-A322-58B7A2E9C69D-->(task4)",
    "xPointArray": [288, 447],
    "yPointArray": [263, 263]
  }, {
    "id": "sid-04B68A87-67EF-4F68-BE79-E74A857EF984",
    "name": null,
    "flow": "(start)--sid-04B68A87-67EF-4F68-BE79-E74A857EF984-->(task1)",
    "xPointArray": [97, 188],
    "yPointArray": [82, 82]
  }]
}

export default data;