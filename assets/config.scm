(use-modules (gnu)
             (gnu system nss)
             (nongnu packages linux)
             (nongnu system linux-initrd))

(use-service-modules desktop xorg)
(use-package-modules bootloaders certs emacs emacs-xyz wm xorg)

(operating-system
 (kernel linux)
 (initrd microcode-initrd)
 (firmware (list linux-firmware))

 (host-name "mind")
 (timezone "Canada/Pacific")
 (locale "en_US.utf8")

 (keyboard-layout
  (keyboard-layout "us" "dvp" #:options '("ctrl:swapcaps")))

 (bootloader (bootloader-configuration
              (bootloader grub-bootloader)
              (terminal-outputs '(console))
              (targets '("/dev/sda"))
              (timeout 8)))

 (mapped-devices (list (mapped-device
                        (source (uuid "2ebc4dfa-5a51-4ceb-b7fb-a23d6e8b736b"))
                        (target "enc")
                        (type luks-device-mapping))))

 (file-systems
  (append
   (map (lambda (mount)
          (file-system
           (device "/dev/mapper/enc")
           (mount-point (cadr mount))
           (type "btrfs")
           (options (string-append (caddr mount) ",subvol=" (car mount)))
           (dependencies mapped-devices)))
        '(("@"          "/"           "noatime,compress=zstd,space_cache=v2")
          ("@boot"      "/boot"       "noatime,compress=zstd,space_cache=v2")
          ("@home"      "/home"       "noatime,compress=zstd,space_cache=v2")
          ("@snapshots" "/.snapshots" "noatime,compress=zstd,space_cache=v2")
          ("@gnu"       "/gnu"        "noatime,compress=zstd,space_cache=v2")
          ("@log"       "/var/log"    "noatime,compress=zstd,space_cache=v2")
          ("@swap"      "/swap"       "noatime")))
   %base-file-systems))

 (swap-devices
  (list (swap-space
         (target "/swap/swapfile")
         (dependencies (filter (file-system-mount-point-predicate "/swap")
                               file-systems)))))

 (users (cons (user-account
               (name "anton")
               (comment "Anton Chen")
               (group "users")
               (supplementary-groups '("wheel" "netdev" "audio" "video")))
              %base-user-accounts))

 (packages (append (list
                    emacs emacs-exwm emacs-desktop-environment
                    xterm)
                   %base-packages))

 ;; Use the "desktop" services, which include the X11
 ;; log-in service, networking with NetworkManager, and more.
 ;; (services %desktop-services)
 (services (cons* (service slim-service-type (slim-configuration
                                              (display ":0")
                                              (vt "vt7")))
                  (service slim-service-type (slim-configuration
                                              (display ":1")
                                              (vt "vt8")))
                  (modify-services %desktop-services
                                   (delete gdm-service-type))))

 ;; Allow resolution of '.local' host names with mDNS.
 (name-service-switch %mdns-host-lookup-nss))
