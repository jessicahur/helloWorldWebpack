## Notes for NgDir:
0. Initiate newEmployee from parentScope first before binding it to the childScope. New obj won't be initiated for newEmployee in the childScope --> will break ng-model on the form inside employee-edit template
1. I have problem with using just '=' in isolated scope for employee-edit. The obj in the parent scope didn't get bound to the local variable inside the childScope.
