./exp1a/data/raw/process/download_aggregate.sh
./exp1b/data/raw/process/download_aggregate.sh
./exp2/data/raw/process/download_aggregate.sh
./exp3/data/raw/process/download_aggregate.sh

Rscript knit_all.r

../compile_homepage/compile_analysis_homepage.sh

../../upload.sh

firefox https://davebraun.net/gaita