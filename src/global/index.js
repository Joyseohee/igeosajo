import production from './production';
import development from './development';
import local from './local';
import wehagov from './wehagov';


const env = { production, development, local, wehagov };

export default env[process.env.REACT_APP_DEPLOY_TYPE];
