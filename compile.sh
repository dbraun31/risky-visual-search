# compile analysis homepage
R -e "rmarkdown::render('experiments/analysis/analysis_homepage.Rmd', encoding = encoding, output_file = 'index.html')"

# compile graph
./ideation/structured/to_html/compile.sh

# upload
rsync -avP --delete -e 'ssh -p 18765'  --exclude=ideation/ --exclude=experiments/production/unused_exps --exclude=meeting_notes/ --exclude=reading/ --exclude=irb/ --exclude=writing/ --exclude=experiments/analysis/unused_exps/ --exclude=experiments/sona/ --exclude=irb/ --exclude=experiments/analysis/exp1/data/ --exclude=experiments/analysis/exp2/data/ --exclude=experiments/analysis/exp3/data/ --exclude=experiments/analysis/exp4/data/ --exclude=experiments/analysis/sona_data/ /home/dave/Dropbox\ \(Lehigh\ University\)/post_doc/professional/projects/gaita/ u231-f6hnzkbwb44b@davebraun.net:~/www/davebraun.net/public_html/gaita/

