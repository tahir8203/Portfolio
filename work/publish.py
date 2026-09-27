import os,json,subprocess,getpass,tarfile
from pathlib import Path
root=Path(__file__).resolve().parents[1]/'outputs'/'portfolio'
print('Ready for publishing credential (hidden).',flush=True)
c=json.loads(getpass.getpass(''))
env=os.environ.copy();env['GIT_TERMINAL_PROMPT']='0';env['GIT_CONFIG_COUNT']='1';env['GIT_CONFIG_KEY_0']='http.extraHeader';env['GIT_CONFIG_VALUE_0']='Authorization: Bearer '+c['token']
def git(*args,auth=False):
 p=subprocess.run(['git','-c','safe.directory='+str(root),*args],cwd=root,env=env if auth else None,capture_output=True,text=True)
 if p.returncode: raise RuntimeError((p.stderr or p.stdout).replace(c['token'],'[REDACTED]'))
 return p.stdout.strip()
if not (root/'.git').exists():git('init','-b',c['branch'])
remotes=git('remote').splitlines()
git('remote','set-url' if 'origin' in remotes else 'add','origin',c['remote_url'])
refs=git('ls-remote','origin','refs/heads/'+c['branch'],auth=True)
if refs:raise RuntimeError('Remote already contains source; must reconcile before publication.')
git('add','dist','.openai','README.md')
git('-c','user.name=Muhammad Tahir Mehmood','-c','user.email=tahir8203@gmail.com','commit','-m','Build light animated portfolio with supplied portrait')
git('push','-u','origin',c['branch'],auth=True)
sha=git('rev-parse','HEAD')
remote=git('ls-remote','origin','refs/heads/'+c['branch'],auth=True).split()[0]
assert sha==remote
archive=root.parents[1]/'work'/'portfolio-deploy.tar.gz'
with tarfile.open(archive,'w:gz') as tar:
 tar.add(root/'.openai'/'hosting.json',arcname='.openai/hosting.json')
 tar.add(root/'dist',arcname='dist')
print(json.dumps({'commit_sha':sha,'archive':str(archive)}),flush=True)

