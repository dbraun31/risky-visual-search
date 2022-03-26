## optional param 'only_missing' if true only hit the dirs where index.html is missing

args <- commandArgs(trailingOnly = TRUE)
arg <- FALSE
if (!(identical(args, character(0)))) {
	arg = arg[1]
}

knit_all <- function(only_missing = FALSE) {

files <- list.files(pattern = '\\.Rmd$', recursive = TRUE)

## put preprocessing first
files <- c(files[grepl('preprocessing', files)], files[!grepl('preprocessing', files)])

for (file in files) {
	stem <- strsplit(file, '/')[[1]]
	stem <- stem[1:length(stem)-1]
	stem <- paste(stem, collapse = '/')
	h <- here::here()
	print(file)
	if (only_missing) {
		if (!grepl('index.html', list.files(stem))) {

			rmarkdown::render(file, encoding = encoding, output_file = 'index.html')	
		}
	} else rmarkdown::render(file, encoding = encoding, output_file = 'index.html')
		
}

}

knit_all(only_missing = arg)