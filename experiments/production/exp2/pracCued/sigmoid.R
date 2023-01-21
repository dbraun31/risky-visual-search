library(tidyverse)

d <- read.csv('my_data.csv')
colnames(d) <- c('rt_window', 'transition', 'pswitch', 'accuracy')
d <- d[d$rt_window<=2500,]

m1 <- glm(accuracy ~ rt_window, data = d, family = binomial(link = 'logit'))

b0 <- m1$coefficients[1]
b1 <- m1$coefficients[2]

d$proba <- 1 / (1 + exp(-(b0 + d$rt_window * b1)))

d %>% 
    mutate(transition = factor(transition)) %>% 
    ggplot(aes(x = rt_window, y = accuracy)) + 
    geom_jitter(aes(color = transition), width = 0.1, height = .1) + 
    geom_line(aes(x = rt_window, y = proba)) +
    scale_y_continuous(labels = seq(0,1, by = .1), breaks = seq(0, 1, by = .1)) + 
    scale_x_continuous(labels = seq(200, 2500, by = 100), breaks = seq(200, 2500, by = 100))

