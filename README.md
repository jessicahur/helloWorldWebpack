## Notes for NgDir:
0. Initiate newEmployee from parentScope first before binding it to the childScope. New obj won't be initiated for newEmployee in the childScope --> will break ng-model on the form inside employee-edit template
