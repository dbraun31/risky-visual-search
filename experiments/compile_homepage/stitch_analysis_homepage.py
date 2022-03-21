import sys
import glob


site_root = 'https://davebraun.net/gaita/experiments/analysis/'

def determine_num_exps(rmd_files_index):
  ## rmd_files is list of rmd_files
  exps = []
  for file in rmd_files_index:
    exp = file[0]
    if exp not in exps:
      exps.append(int(exp[-1]))

  return max(exps)

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
  num_exps = determine_num_exps(rmd_files_index)

  for exp in range(1, num_exps+1):
    body += '\n## Experiment {}\n'.format(exp)
    rel_scripts = [x for x in rmd_files_index if x[0] == 'exp' + str(exp)]
    secondary_headers = list(set([x[1] for x in rel_scripts]))
    for secondary_header in secondary_headers:
      body += '### {} Analyses\n'.format(' '.join(secondary_header.split('-')).title())
      rel_scripts = [x for x in rmd_files_index if secondary_header in x and 'exp{}'.format(exp) in x]
      for script in rel_scripts:
        ## analyis name
        body += '* [{} Analysis]'.format(' '.join(script[-1].replace('.Rmd', '').split('_')).title())
        ## analysis link
        secondary_dir = ''
        if len(script) == 4:
          print(script)
          secondary_dir = '/' + script[-2]
        body += '({}exp{}/scripts/{}{}){{target=_blank}}\n\n'.format(site_root, exp, secondary_header, secondary_dir)




  
  with open('analysis_homepage.Rmd', 'w') as file:
    file.write(body)

  file.close()
  





if __name__ == '__main__':
  main()