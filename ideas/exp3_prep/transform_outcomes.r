library(tidyverse)

## the goal here is to take the gamble outcomes from pachur et al (on scale -100 to 100) and convert them to scale 1 to 63

d <- read.csv('gambles_formatted.csv')
head(d)

scaling_factor <- 1 / (31/100)

t <-  d %>% 
  gather(var, value, gamblea_outcome1:gambleb_probability2) %>% 
  separate(var, into = c('gamble', 'outcome'), sep = '_') %>% 
  spread(outcome, value) %>% 
  gather(outcome_number, outcome, outcome1:outcome2) %>% 
  gather(probability_number, probability, probability1:probability2) %>% 
  mutate(outcome_scaled = round(outcome / scaling_factor) + 32) 

t$quick <- t$outcome_scaled-32
hist(t$quick)

  select(-outcome) %>% 
  rename(outcome = outcome_scaled) %>% 
  spread(probability_number, probability) %>% 
  spread(outcome_number, outcome) %>% 
  gather(var, value, probability1:outcome2) %>%   
  unite(group, gamble:var) %>% 
  spread(group, value) 

write.csv(d, 'gambles_scaled.csv', row.names = FALSE)

  
