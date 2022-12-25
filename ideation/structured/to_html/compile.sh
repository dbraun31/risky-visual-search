obsidianhtml convert -i config.yaml

#cp -r ../md/figures/ output/html/

rsync -avP --delete -e 'ssh -p 18765'  /home/dave/Dropbox\ \(Lehigh\ University\)/post_doc/professional/projects/gaita/ideation/structured/to_html/output/html/* u231-f6hnzkbwb44b@davebraun.net:~/www/davebraun.net/public_html/gaita/ideation/structured/html/


