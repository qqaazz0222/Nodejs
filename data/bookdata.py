from urllib.request import urlopen
from bs4 import BeautifulSoup

print("start")
html = urlopen("http://www.yes24.com/24/Category/BestSeller")  
bsObject = BeautifulSoup(html, "html.parser")
bookname = []
for i in range(1, 41):
	print(str(i) + "start")
	temp = bsObject.select_one('#bestList > ol > li.num' + str(i) + ' > p:nth-child(3) > a')
    print(temp)
	bookname.append(temp.get_text())
	print(str(i) + "fin")
print(bookname) # 웹 문서 전체가 출력됩니다. 