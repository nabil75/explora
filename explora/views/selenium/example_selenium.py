from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys



def googleSearch():

    options = webdriver.ChromeOptions()
    options.add_experimental_option("detach", True)
    driver = webdriver.Chrome(executable_path="C:/Users/nabil/OneDrive/Documents/Travail/django_projects/explora/chromedriver.exe", options=options)
    driver.get("http://www.google.com")
    driver.find_element(By.ID, "L2AGLb").click()
    input = driver.find_element(By.NAME,"q")
    input.send_keys("selenium+python")
    input.send_keys(Keys.ENTER)

    print(driver.current_url)
    driver.close()

googleSearch()
