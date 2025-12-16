# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e6]:
    - heading "Your Internet access is blocked" [level=1] [ref=e7]
    - paragraph [ref=e8]: Firewall or antivirus software may have blocked the connection.
    - generic [ref=e9]:
      - paragraph [ref=e10]: "Try:"
      - list [ref=e11]:
        - listitem [ref=e12]: Checking the connection
        - listitem [ref=e13]:
          - link "Checking firewall and antivirus configurations" [ref=e14] [cursor=pointer]:
            - /url: "#buttons"
        - listitem [ref=e15]:
          - link "Running Windows Network Diagnostics" [ref=e16] [cursor=pointer]:
            - /url: javascript:diagnoseErrors()
    - generic [ref=e17]: ERR_NETWORK_ACCESS_DENIED
  - button "Details" [ref=e19] [cursor=pointer]
```