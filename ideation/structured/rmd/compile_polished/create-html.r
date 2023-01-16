library(stringr)
args = commandArgs(trailingOnly = TRUE)
file <- str_match(args, '\\/?([\\w\\-_]+?)\\.Rmd')[2]
rmarkdown::render(args, encoding=encoding, output_file=paste0('../polished/', file, '.html'))
