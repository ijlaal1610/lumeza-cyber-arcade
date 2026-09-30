import paramiko

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('92.4.75.121', username='ubuntu', password='0786')

def run(cmd):
    print(f'CMD: {cmd}')
    stdin, stdout, stderr = ssh.exec_command(cmd)
    out = stdout.read().decode('utf-8', errors='ignore')
    err = stderr.read().decode('utf-8', errors='ignore')
    print(out)
    if err:
        print('ERR:', err)

base_url = 'https://raw.githubusercontent.com/ggoulart/cs1.6-server-more-maps/master/AimMapCs1.6/cstrike/maps'
maps = [
    'awp_india.bsp',
    'awp_india.txt',
    'awp_india.res',
    'fy_pool_day.bsp',
    'fy_pool_day.txt',
    'fy_pool_day.res',
    'fy_iceworld2k.bsp',
    'fy_iceworld2k.txt',
    'fy_iceworld2k.res',
    'fy_snow.bsp',
    'fy_snow.txt',
    'aim_headshot.bsp',
    'aim_headshot.txt'
]

for m in maps:
    cmd = f'curl -sL "{base_url}/{m}" -o "/home/ubuntu/cs_assets/cstrike/maps/{m}"'
    run(cmd)

run('ls -lh /home/ubuntu/cs_assets/cstrike/maps/')

ssh.close()
