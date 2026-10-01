import paramiko
import os

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('92.4.75.121', username='ubuntu', password='0786')
sftp = ssh.open_sftp()

files_to_upload = [
    ('portal/index.html', '/home/ubuntu/index.html', '/var/www/games.lumeza.in/index.html'),
    ('portal/portal.js', '/home/ubuntu/portal.js', '/var/www/games.lumeza.in/portal.js'),
    ('portal/styles.css', '/home/ubuntu/styles.css', '/var/www/games.lumeza.in/styles.css'),
    ('caesar3/index.html', '/home/ubuntu/caesar3_index.html', '/var/www/games.lumeza.in/caesar3/index.html'),
    ('caesar3/caesar3.ui.js', '/home/ubuntu/caesar3.ui.js', '/var/www/games.lumeza.in/caesar3/caesar3.ui.js')
]

for local_path, temp_remote, dest_remote in files_to_upload:
    print(f'Uploading {local_path} -> {temp_remote}...')
    sftp.put(local_path, temp_remote)
    print(f'Done temp upload: {temp_remote}')

sftp.close()

# Copy to final destination with sudo
copy_cmds = [
    'echo 0786 | sudo -S cp /home/ubuntu/index.html /var/www/games.lumeza.in/index.html',
    'echo 0786 | sudo -S cp /home/ubuntu/portal.js /var/www/games.lumeza.in/portal.js',
    'echo 0786 | sudo -S cp /home/ubuntu/styles.css /var/www/games.lumeza.in/styles.css',
    'echo 0786 | sudo -S cp /home/ubuntu/caesar3_index.html /var/www/games.lumeza.in/caesar3/index.html',
    'echo 0786 | sudo -S cp /home/ubuntu/caesar3.ui.js /var/www/games.lumeza.in/caesar3/caesar3.ui.js',
    'echo 0786 | sudo -S chown -R www-data:www-data /var/www/games.lumeza.in/',
    'echo 0786 | sudo -S chmod 644 /var/www/games.lumeza.in/index.html /var/www/games.lumeza.in/portal.js /var/www/games.lumeza.in/styles.css /var/www/games.lumeza.in/caesar3/index.html /var/www/games.lumeza.in/caesar3/caesar3.ui.js',
    'echo 0786 | sudo -S systemctl reload nginx'
]

full_cmd = ' && '.join(copy_cmds)
stdin, stdout, stderr = ssh.exec_command(full_cmd)
stdout_text = stdout.read().decode('utf-8', errors='ignore')
stderr_text = stderr.read().decode('utf-8', errors='ignore')
print('Sudo copy & reload result:\n', stdout_text)
if stderr_text:
    print('Sudo stderr (any password prompt info):\n', stderr_text)

stdin, stdout, stderr = ssh.exec_command('curl -sI https://games.lumeza.in/ && echo "---" && curl -sI https://games.lumeza.in/caesar3/')
print('HTTP verification:\n' + stdout.read().decode('utf-8', errors='ignore'))

# Check file sizes on remote
stdin, stdout, stderr = ssh.exec_command('ls -lh /var/www/games.lumeza.in/index.html /var/www/games.lumeza.in/portal.js /var/www/games.lumeza.in/styles.css /var/www/games.lumeza.in/caesar3/index.html /var/www/games.lumeza.in/caesar3/caesar3.ui.js')
print('Remote file check:\n' + stdout.read().decode('utf-8', errors='ignore'))

ssh.close()
