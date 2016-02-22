## Notes for NgDir:
0. Initiate newEmployee from parentScope first before binding it to the childScope. New obj won't be initiated for newEmployee in the childScope --> will break ng-model on the form inside employee-edit template --> This seems to be a result from another bug. Code with no empty obj initiation runs fine now.
1. I have problem with using just '=' in isolated scope for employee-edit. The obj in the parent scope didn't get bound to the local variable inside the childScope. --> Quote Angular documentation:

> Given <my-component my-attr="parentModel"> and the isolate scope definition scope: { localModel: '=myAttr' }

So basically if the inner scope variable is newEmployee, the attribute outside in index.html has to be in the form of new-employee. Angular won't tolerate an attribute in the form newEmployee.
