import uploadTemplates from './upload_templates';
import uploadWinfiles from './upload_winfiles';
import createStack from './create_stack';
import checkStatus from './check_status';


export default async () => {
  let locTemplates = await uploadTemplates();
  uploadWinfiles();
  let stack = await createStack(locTemplates.Location);
  await checkStatus(stack.StackId);

}
