import glob
import re
import os
import pathlib
import fitz

os.chdir("C:/Users/nabil/OneDrive/Documents/BDF/Documentation/methodologie/")
files = glob.glob("*.pdf")

def extractPdfFiles(files):
    for file in files:
        pdf_path = "C:/Users/nabil/OneDrive/Documents/BDF/Documentation/methodologie/"+str(file)
        output_path = "C:/Users/nabil/OneDrive/Documents/BDF/Documentation/methodologie/all_text/"
        file_name = str(file).split(".")[0]
        split_pdf(pdf_path,output_path, file_name)
        


def split_pdf(pdf_path, output_path, file_name):

    # Open the PDF file
    doc = fitz.open(pdf_path)

    # Loop through each page of the PDF
    for page_num in range(doc.page_count):
        page = doc.load_page(page_num)
        # Get the dimensions of the page
        page_width = page.rect.width
        page_height = page.rect.height
        # Calculate the height of the header and footer as a fraction of the page height
        header_height = 0.08 * page_height
        footer_height = 0.1 * page_height
        # Define a rectangle that excludes the header and footer
        rect = fitz.Rect(0, header_height, page_width, page_height - footer_height)
        # Extract the text from the page
        text = page.get_text("text", clip=rect)
        # Write the match text to the file
        with open(f"{output_path}{file_name}.txt", "a", encoding="utf-8-sig") as f:
            f.write(text)


# split_pdf(pdf_path, output_path)

extractPdfFiles(files)