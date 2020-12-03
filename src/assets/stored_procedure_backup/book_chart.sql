CREATE PROCEDURE `books_chart`(out book_count  int, out lend_count  int,out avail_count int)
BEGIN

    DECLARE totalBooks CURSOR FOR select count(1) from books where is_active='Y';
    DECLARE BooksInLend CURSOR FOR select count(1) from books where is_active='Y' and status='Y';
    DECLARE BooksAVilable CURSOR FOR select count(1) from books where is_active='Y'and status='N';

    open totalBooks;
    fetch totalBooks into book_count;
    close totalBooks;    
    
    open BooksInLend;
    fetch BooksInLend into lend_count;
    close BooksInLend; 
    
    open BooksAVilable;
    fetch BooksAVilable into avail_count;
    close BooksAVilable;

END