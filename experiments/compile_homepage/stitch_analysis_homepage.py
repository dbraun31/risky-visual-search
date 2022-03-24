import sys
import glob
import re


site_root = 'https://davebraun.net/gaita/experiments/analysis/'

two_part_experiments = ['1']

def determine_exp_names(rmd_files_index):
  ## rmd_files is list of rmd_files
  exps = []
  for file in rmd_files_index:
    exp = file[0]
    if exp not in exps:
      exps.append(exp)

  return list(set(exps))

def sort_exp_names(exp_names, two_part_experiments):
  t = [x + 'a' if re.search(r'(\d)', x).group(1) not in two_part_experiments else x for x in exp_names]
  t = sorted(t, key = lambda x: (x[-2], x[-1]))
  return [x.replace('a', '') if x[-2] not in two_part_experiments else x for x in t]




def compute_file_index(rmd_files):
  out = []
  for file in rmd_files:
    t = file.split('/')
    t = t[t.index('analysis')+1:]
    t.remove('scripts')
    out.append(t)
  return out


def main():
  body = '''---
title: "Risky Visual Search Experiments"
author: "Dave Braun"
date: '`r format(Sys.time(), "%b %d %Y, %H:%M:%S")`'
output:
  html_document:
    code_folding: hide
    df_print: paged
    include:
      in_header: ../analysis/html/favicon.html
      after_body: ../analysis/html/footer.html
---

# {.tabset}
  '''


  rmd_files = glob.glob('../analysis/**/*.Rmd', recursive = True)
  rmd_files_index = compute_file_index(rmd_files)

  ## determine number of exps
  exp_names = determine_exp_names(rmd_files_index)
  exp_names = sort_exp_names(exp_names, two_part_experiments)

  for exp in exp_names:
    body += '\n## Experiment {}\n'.format(re.search(r'(\d.*)', exp).group(1))
    rel_scripts = [x for x in rmd_files_index if x[0] == exp]
    secondary_headers = list(set([x[1] for x in rel_scripts]))
    for secondary_header in secondary_headers:
      body += '### {} Analyses\n'.format(' '.join(secondary_header.split('-')).title())
      rel_scripts = [x for x in rmd_files_index if secondary_header in x and exp in x]
      for script in rel_scripts:
        ## analyis name
        body += '* [{} Analysis]'.format(' '.join(script[-1].replace('.Rmd', '').split('_')).title())
        ## analysis link
        secondary_dir = ''
        if len(script) == 4:
          secondary_dir = '/' + script[-2]
        body += '({}{}/scripts/{}{}){{target=_blank}}\n\n'.format(site_root, exp, secondary_header, secondary_dir)




  
  with open('/home/dave/Dropbox (Lehigh University)/post_doc/professional/practical_new_world/gaita/experiments/compile_homepage/analysis_homepage.Rmd', 'w') as file:
    file.write(body)

  file.close()
  





if __name__ == '__main__':
  main()