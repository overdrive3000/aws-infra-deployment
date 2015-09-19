import uploadTemplates from './upload_templates';
import uploadWinfiles from './upload_winfiles';
import createStack from './create_stack';
import checkStatus from './check_status';


export default async () => {
  let locTemplates = await uploadTemplates();
  let winfiles = await uploadWinfiles();
  let stack = await createStack(locTemplates.Location);

  let status = await checkStatus(stack.StackId);
  console.log(status);

}
