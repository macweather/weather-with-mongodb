# https://wiki.archlinux.org/index.php/Network_configuration#Manual_connection_at_boot_using_systemd
# /etc/systemd/system/network@.service
[Unit]
Description=Network connectivity (%i)
Wants=network.target
Before=network.target
BindsTo=sys-subsystem-net-devices-%i.device
After=sys-subsystem-net-devices-%i.device

[Service]
Type=oneshot
RemainAfterExit=yes
EnvironmentFile=/etc/conf.d/network@%i

ExecStart=/usr/bin/ip link set dev %i up
ExecStart=/usr/bin/ip addr add ${address}/${netmask} broadcast ${broadcast} dev %i
ExecStart=/usr/bin/sh -c 'test -n ${gateway} && /usr/bin/ip route add default via ${gateway}'

ExecStop=/usr/bin/ip addr flush dev %i
ExecStop=/usr/bin/ip link set dev %i down

[Install]
WantedBy=multi-user.target

# systemctl enable network@<interface>.service
# systemctl start network@<interface>.service 