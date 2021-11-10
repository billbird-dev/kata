### kata
> Mold in japaneese
### approach
- [ ] schema based templating and rendering
- [ ] create base components
- [ ] allow users to create templates by mix and match
- [ ] convert template to JSON/YAML intructions
- [ ] SSR invoice

### Components
  - [ ] header
    - [ ] info
    - [ ] logo
    - [ ] ...
  - [ ] title
    - [ ] invoice text
  - [ ] customer info
      - [ ] 2/3 col -> flex
        - [ ] info
        - [ ] address
        - [ ] invoice details
  - [ ] invoice items n*col -> flex 
    - [ ] index -> xs
    - [ ] item name -> min:md
    - [ ] hsn -> min:sm
    - [ ] qty -> min:sm
    - [ ] rate -> min:sm
    - [ ] discount -> min:sm
    - [ ] gst -> min:sm
    - [ ] amount -> min:sm
  - [ ] bottom -> flex
    - [ ] totals -> max:lg
    - [ ] qty -> min:sm
    - [ ] discount -> min:sm
    - [ ] gst -> min:sm
    - [ ] amount -> min:sm
  - [ ] invoice info 2 col -> flex
    - [ ] footer info
    - [ ] invoice details row -> flex-col
      - [ ] sub
      - [ ] discount
      - [ ] sgst
      - [ ] cgst
      - [ ] total
      - [ ] due
      - [ ] mode
  - [ ] footer
    - [ ] info
    - [ ] sign