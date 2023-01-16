import sys
import re

def read_rmd(path):
    f = []

    with open(path, 'r') as file:
        for line in file:
            f.append(line)
        file.close()

    return f

def extract_ends(rmd_list):
    beginning = []

    for line in rmd_list:
        if 'md_document' not in line:
            beginning.append(line)
        else:
            break

    for idx, line in enumerate(rmd_list):
        if 'knit:' in line:
            end = rmd_list[idx+1:]
            break

    return [beginning, end]


def extract_file_name(path):
    search = r'\/?([\w\-_]+?)\.Rmd'
    return re.findall(search, path)[0]
    


def html_yaml(rmd_list):
    new_yaml = [
            '   html_document:\n',
            '       toc: true\n',
            '       theme: flatly\n',
            '       code_folding: hide\n',
            '       df_print: paged\n']

    beginning, end = extract_ends(rmd_list)

    return beginning + new_yaml + end

def modify_options(new_file):
    out_file = []
    to_omit = [
            'fig.path',
            'fig.align',
            'echo = FALSE',
            'knitr::opts_knit$set']

    for line in new_file:
        flag = 0
        for omit in to_omit:
            if omit in line:
                flag += 1
        if not flag:
            out_file.append(line)

    return out_file
        
def write_new_file(new_file, file_name):
    with open(file_name + '.Rmd', 'w') as file:
        for line in new_file:
            file.write(line)
        file.close()

    print('All operations completed successfully')

if __name__ == '__main__':
    path = sys.argv[1]

    if not path:
        print('Usage: path/to/file.Rmd')
        sys.exit(1)

    file_name = extract_file_name(path)
    rmd_list = read_rmd(path)
    new_file = html_yaml(rmd_list)
    new_file = modify_options(new_file)

    write_new_file(new_file, file_name)



